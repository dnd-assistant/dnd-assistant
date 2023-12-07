import { useCallback, useEffect, useRef } from "react";

interface Props {
  className?: string,
};

export const SignInWithGoogle: React.FC<Props> = (props) => {
  const buttonRef = useRef<HTMLDivElement>();
  const buttonRefHook = useCallback((node: HTMLDivElement) => {
    buttonRef.current = node;
    triggerGoogleButtonRender();
  }, []);
  const triggerGoogleButtonRender = () => {
    if ((window as any).google && buttonRef.current) {
      (window as any).google.accounts.id.renderButton(buttonRef.current, {
        type: 'standard',
        shape: 'rectangular',
        theme: 'filled_black',
        text: 'continue_with',
        size: 'large',
        logo_alignment: 'left',
      })
    }
  };
  useEffect(() => {
    const googleScriptNodeId = 'google-auth-script';
    const existingNode = document.getElementById(googleScriptNodeId);
    if (!existingNode) {
      const googleScriptNode = document.createElement('script')
      googleScriptNode.src = 'https://accounts.google.com/gsi/client';
      googleScriptNode.async = true;
      googleScriptNode.id = googleScriptNodeId;
      googleScriptNode.addEventListener('load', () => {
        (window as any).google?.accounts.id.initialize({
           client_id: '855994409293-i9rrk07efudt7djsekpjjvah0iub2gr1.apps.googleusercontent.com',
           context: 'signin',
           ux_mode: 'popup',
           login_uri: 'dndassistant.io/api/login/google',
           auto_prompt: 'false',
        });
        triggerGoogleButtonRender();
      });
      document.head.appendChild(googleScriptNode)
    }
  }, []);
  return (
    <div className={props.className}>
      <div ref={buttonRefHook} className="g_id_signin"></div>
    </div>
  )
};
