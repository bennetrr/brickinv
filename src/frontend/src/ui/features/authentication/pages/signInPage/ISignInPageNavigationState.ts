export default interface ISignInPageNavigationState {
  redirectPath?: string;
  message?: {
    type: 'success' | 'error' | 'info' | 'neutral';
    text: string;
  }
}
