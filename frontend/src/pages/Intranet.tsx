import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';

interface Article {
  title: string;
  paragraphs: string[];
}

export default function Intranet() {
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    // Mount copilot widget when available
    if (window.mountChainlitWidget) {
      window.mountChainlitWidget({ chainlitServer: window.location.origin });
    }
    const handler = (e: any) => {
      const { name, args, callback } = e.detail;
      if (name === 'render_article') {
        setArticle({
          title: args.title,
          paragraphs: args.paragraphs || [],
        });
        if (callback) callback({ success: true });
      }
    };
    window.addEventListener('chainlit-call-fn', handler);
    return () => {
      window.removeEventListener('chainlit-call-fn', handler);
      if (window.unmountChainlitWidget) {
        window.unmountChainlitWidget();
      }
    };
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center relative">
      {article ? (
        <div className="max-w-2xl p-4">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          {article.paragraphs.map((p, i) => (
            <p key={i} className="mb-2">
              {p}
            </p>
          ))}
        </div>
      ) : (
        <Logo className="w-52" />
      )}
      <p className="fixed bottom-24 right-8 text-sm text-muted-foreground">
        Have a chat to get started
      </p>
    </div>
  );
}
