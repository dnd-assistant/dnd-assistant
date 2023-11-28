import { Auth } from './auth';
import { Home } from './home';
import { NotFound } from './not-found';
import { Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { useEffect, useRef, useState } from 'react';
import { trpc } from '../utils/trpc';

/* Ionic */
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { setupIonicReact } from '@ionic/react';
import { Menu } from './components/menu';

setupIonicReact();
export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: '/api/trpc/',
          async headers() {
            return {}
          },
        }),
      ],
    }),
  );
  return (
    <IonApp>
      <IonReactRouter>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <IonSplitPane when="lg" contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/" exact component={Home} />
                <Route path="/auth" exact component={Auth} />
              </IonRouterOutlet>
            </IonSplitPane>
          </QueryClientProvider>
        </trpc.Provider>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
