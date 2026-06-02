'use client';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
      {/* Sender label */}
      <span
        className={`text-[10px] font-mono mb-1 ${
          isUser ? 'text-text-muted' : 'text-accent'
        }`}
      >
        {isUser ? 'You' : 'DM'}
      </span>

      {/* Message bubble */}
      <div
        className={
          isUser
            ? 'bg-accent/10 border border-accent/20 text-text-primary rounded-xl rounded-tr-sm px-4 py-3 max-w-[80%] ml-auto text-sm'
            : 'bg-bg-surface border border-bg-border text-text-secondary rounded-xl rounded-tl-sm px-4 py-3 max-w-[80%] text-sm'
        }
      >
        {content}
      </div>
    </div>
  );
}
