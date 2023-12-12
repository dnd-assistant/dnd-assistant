import { useCallback, useEffect, useRef } from "react";
import { trpc } from '../../../utils/trpc';

interface Props {
  className?: string,
};

export const SignInWithGoogle: React.FC<Props> = (props) => {
  const buttonRef = useRef<HTMLDivElement>();
  const signInWithGoogle = trpc.user.signInWithGoogle.useMutation();
  const triggerGoogleButtonRender = useCallback(() => {
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
  }, []);
  const googleSignInHook = useCallback((args: any) => {
    signInWithGoogle.mutate(args);
  }, []);

  useEffect(() => {
    if (signInWithGoogle.isSuccess) {
      localStorage.setItem('authToken', signInWithGoogle.data);
    }
  }, [signInWithGoogle.data]);
  const buttonRefHook = useCallback((node: HTMLDivElement) => {
    buttonRef.current = node;
    triggerGoogleButtonRender();
  }, [triggerGoogleButtonRender]);
  const googleSignInBtnOnLoadHook = useCallback(() => {
    (window as any).google?.accounts.id.initialize({
       client_id: '855994409293-i9rrk07efudt7djsekpjjvah0iub2gr1.apps.googleusercontent.com',
       context: 'signin',
       ux_mode: 'popup',
       login_uri: 'https://80--main--dnd-assistant--cmeyer.coder.tartarus.cloud/api/login/google',
       callback: googleSignInHook,
       auto_prompt: 'false',
    });
    triggerGoogleButtonRender();
  }, [googleSignInHook, triggerGoogleButtonRender]);
  useEffect(() => {
    const googleScriptNodeId = 'google-auth-script';
    const existingNode = document.getElementById(googleScriptNodeId);
    if (!existingNode) {
      const googleScriptNode = document.createElement('script')
      googleScriptNode.src = 'https://accounts.google.com/gsi/client';
      googleScriptNode.async = true;
      googleScriptNode.id = googleScriptNodeId;
      googleScriptNode.addEventListener('load', googleSignInBtnOnLoadHook);
      document.head.appendChild(googleScriptNode)
    }
  }, [googleSignInBtnOnLoadHook]);
  return (
    <div className={props.className}>
      <div ref={buttonRefHook} className="g_id_signin"></div>
    </div>
  )
};