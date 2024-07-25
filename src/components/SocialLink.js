const SocialLink = ({ children, link }) => {
    const handleOpenLink = () => {
        window.open(link);
    }
    return (
        <button onClick={handleOpenLink}>
            { children }
        </button>
    )
}

export default SocialLink;