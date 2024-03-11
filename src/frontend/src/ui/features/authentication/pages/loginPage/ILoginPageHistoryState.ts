export default interface ILoginPageHistoryState {
  redirectPath?: string;
  message?: {
    type: 'success' | 'error' | 'info' | 'neutral';
    text: string;
  }
}
