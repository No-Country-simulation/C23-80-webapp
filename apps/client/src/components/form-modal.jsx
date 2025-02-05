/**
 * Modal for forms
 * @params {id:strng, show:boolean, type:'category'|'resource'|'collection'} props
 * @params {setModalFeatures:(id:string, show:boolean, type:'category'|'resource'|'collection') => void} props
 * @params {setDataTable:(data:object) => void} props
 * @returns JSX
 */
const FormModal = ({
    isOpen,
    children,
}) => {
    
    return isOpen? (
        <div className="absolute top-0 z-20 left-0 w-full h-full bg-black/50 bg-opacity-90 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg max-w-[420px] w-full">
                {children}
            </div>
        </div>
    ) : null;
}

export default FormModal;