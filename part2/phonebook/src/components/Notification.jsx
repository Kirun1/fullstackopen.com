const Notification = ({ message, type }) => {
    if (!message) return null;
    
    const notificationStyle = {
        color: type === 'error' ? 'red' : 'green',
        background: type === 'error' ? '#f8d7da' : '#d4edda',
        fontSize: '20px',
        border: type === 'error' ? '2px solid red' : '2px solid green',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        textAlign: 'left',
        width: '100%',
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification;