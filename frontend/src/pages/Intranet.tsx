import { useEffect, useState } from 'react';

import { Logo } from '@/components/Logo';
import { useTranslation } from '@/components/i18n/Translator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Calendar from '@/components/Calendar';

export default function Intranet() {
  const [Component, setComponent] = useState<React.ComponentType<any>>();
  const [props, setProps] = useState<Record<string, unknown>>({});
  const { t } = useTranslation();

  useEffect(() => {
    const w = window as any;
    if (w.mountChainlitWidget) {
      w.mountChainlitWidget({ chainlitServer: window.location.origin });
    }

    const handler = async (e: any) => {
      const { name, args, callback } = e.detail;
      if (name === 'render_element' && args?.component) {
        try {
          const mod = await import(
            /* @vite-ignore */ `/elements/${args.component}.jsx`
          );
          setComponent(() => mod.default);
          setProps(args.props || {});
          callback?.({ success: true });
        } catch (err) {
          console.error(err);
          callback?.({ success: false, error: String(err) });
        }
      }
    };

    window.addEventListener('chainlit-call-fn', handler);
    return () => {
      window.removeEventListener('chainlit-call-fn', handler);
      if (w.unmountChainlitWidget) {
        w.unmountChainlitWidget();
      }
    };
  }, []);

  const Element = Component;

  const latestArticles = [
    'Welcome to the intranet',
    'How to request PTO',
    'Quarterly results',
    'New office policy',
    'Benefits overview'
  ];

  const ArticleBubble = ({ title }: { title: string }) => (
    <Button variant="outline" className="w-fit rounded-3xl" size="sm">
      <p className="text-sm text-muted-foreground truncate">{title}</p>
    </Button>
  );

  return (
    <div className="flex flex-col h-screen w-screen">
      <header className="flex items-center justify-between p-4 border-b">
        <Logo className="h-10" />
        <Input
          type="search"
          placeholder={t('intranet.searchPlaceholder')}
          className="max-w-xs"
        />
      </header>
      <div className="p-4 flex flex-wrap gap-2 justify-center border-b">
        {latestArticles.slice(0, 5).map((a, i) => (
          <ArticleBubble key={i} title={a} />
        ))}
      </div>
      <div className="flex flex-grow overflow-hidden">
        <div className="flex-1 flex flex-col items-center overflow-auto p-4">
          {Element ? (
            <Element {...props} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 mt-10">
              <Logo className="w-52" />
              <p className="text-sm text-muted-foreground">
                {t('intranet.placeholder')}
              </p>
            </div>
          )}
        </div>
        <div className="w-80 p-4 border-l overflow-auto hidden md:block">
          <Calendar />
        </div>
      </div>
    </div>
  );
}
