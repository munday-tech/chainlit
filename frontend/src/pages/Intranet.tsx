import { useEffect, useState } from 'react';

import { Logo } from '@/components/Logo';
import { useTranslation } from '@/components/i18n/Translator';
import Page from 'pages/Page';

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

  return (
    <Page>
      <div className="flex flex-col h-full w-full items-center justify-center overflow-auto p-4">
        {Element ? (
          <Element {...props} />
        ) : (
          <div className="flex flex-col items-center gap-2 mt-10">
            <Logo className="w-52" />
            <p className="text-sm text-muted-foreground">{t('intranet.placeholder')}</p>
          </div>
        )}
      </div>
    </Page>
  );
}
