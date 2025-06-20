
type SessionTimeoutModalProps = {
  open: boolean;
  onLogin: () => void;
};

function SessionTimeoutModal({ open, onLogin }: SessionTimeoutModalProps) {
  if (!open) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Session Expired</h2>
        <p>Your session has timed out. Please log in again.</p>
        <button onClick={onLogin}>Login</button>
      </div>
    </div>
  );
}

export default SessionTimeoutModal;