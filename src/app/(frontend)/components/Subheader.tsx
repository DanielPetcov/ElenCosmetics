const Subheader = ({children} : {children : string}) => {
    return (
        <div className="bg-gray-700 py-2 text-center">
            <span className="text-sm text-white font-normal">{children}</span>
        </div>
    )
}

export default Subheader;