import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import cloud from 'd3-cloud';
import { select, Selection } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { extent } from 'd3-array';

@Component({
  selector: 'app-skill-cloud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill-cloud.component.html',
  styleUrl: './skill-cloud.component.css'
})
export class SkillCloud implements OnChanges, AfterViewInit, OnDestroy {
  @Input() skills: Array<{ name: string; proficiency?: number } > = [];
  @ViewChild('cloudContainer', { static: true }) cloudContainer!: ElementRef<HTMLDivElement>;

  private svg?: Selection<SVGSVGElement, unknown, null, undefined>;
  private resizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    this.observeResize();
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['skills']) {
      this.render();
    }
  }

  ngOnDestroy(): void {
    this.teardown();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private observeResize(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.render();
    });
    this.resizeObserver.observe(this.cloudContainer.nativeElement);
  }

  private teardown(): void {
    if (this.svg) {
      this.svg.remove();
      this.svg = undefined;
    }
  }

  private render(): void {
    if (!this.cloudContainer) {
      return;
    }

    this.teardown();

    const container = this.cloudContainer.nativeElement;
    const width = Math.max(320, container.clientWidth || 700);
    const height = Math.max(260, container.clientHeight || 380);

    // Prepare data
    const wordsData = (this.skills || []).map((s) => ({
      text: s.name,
      value: s.proficiency ?? 60
    }));

    if (wordsData.length === 0) {
      return;
    }

    // Scales
    const sizeScale = scaleLinear()
      .domain(extent(wordsData, d => d.value) as [number, number])
      .range([16, 48]);

    const colorScale = scaleLinear<string>()
      .domain([50, 60, 70, 80, 90])
      .range(['#9CA3AF', '#F59E0B', '#8B5CF6', '#3B82F6', '#10B981']);

    // Layout
    const layout = cloud()
      .size([width, height])
      .words(wordsData.map(d => ({ text: d.text, size: Math.round(sizeScale(d.value)) } as cloud.Word)))
      .padding(5)
      .rotate(() => Math.random() > 0.85 ? (Math.random() > 0.5 ? 30 : -30) : 0)
      .font('Inter, ui-sans-serif, system-ui')
      .fontSize((d: cloud.Word) => (d.size as number))
      .on('end', (words) => {
        // Draw SVG
        this.svg = select(container)
          .append('svg')
          .attr('width', width)
          .attr('height', height);

        const g = this.svg
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const texts = g
          .selectAll('text')
          .data(words as cloud.Word[])
          .enter()
          .append('text')
          .style('font-family', 'Inter, ui-sans-serif, system-ui')
          .style('font-size', (d) => `${d.size}px`)
          .style('fill', (d) => colorScale((d.size as number) || 60))
          .attr('text-anchor', 'middle')
          .attr('transform', (d) => `translate(${d.x}, ${d.y}) rotate(${d.rotate}) scale(0.8)`)
          .style('cursor', 'default')
          .style('opacity', 0)
          .text((d) => `${d.text}`)
          .transition()
          .duration(400)
          .style('opacity', 0.9)
          .attr('transform', (d: any) => `translate(${d.x}, ${d.y}) rotate(${d.rotate}) scale(1)`);

        // Hover interactions
        g.selectAll('text')
          .on('mouseover', function () { select(this as any).transition().duration(150).style('opacity', 1).attr('transform', function(d: any) { return `translate(${d.x}, ${d.y}) rotate(${d.rotate}) scale(1.08)`; }); })
          .on('mouseout', function () { select(this as any).transition().duration(150).style('opacity', 0.9).attr('transform', function(d: any) { return `translate(${d.x}, ${d.y}) rotate(${d.rotate}) scale(1)`; }); });

        // Gentle jitter animation
        g.selectAll('text')
          .transition()
          .delay(() => Math.random() * 1200)
          .duration(1500)
          .ease((t: number) => t)
          .attrTween('transform', function(d: any) {
            const x = d.x, y = d.y, r = d.rotate;
            const jitter = () => (Math.random() - 0.5) * 1.5;
            return function() {
              return `translate(${x + jitter()}, ${y + jitter()}) rotate(${r}) scale(1)`;
            };
          })
          .on('end', function repeat(this: any, d: any) {
            select(this)
              .transition()
              .duration(2000)
              .attrTween('transform', function() {
                const x = d.x, y = d.y, r = d.rotate;
                const jitter = () => (Math.random() - 0.5) * 1.5;
                return function() {
                  return `translate(${x + jitter()}, ${y + jitter()}) rotate(${r}) scale(1)`;
                };
              })
              .on('end', repeat);
          });
      });

    layout.start();
  }
}
