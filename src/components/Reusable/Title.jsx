function Title({title, font, className}) {
    return (
        <div className={`title ${className}`}>
            <h3 style={{fontSize: `${font}rem`}}>{title}</h3>
        </div>
    )
}

export default Title
