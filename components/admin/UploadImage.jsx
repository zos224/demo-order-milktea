const UploadImage = ({label, thumb, returnValue}) => {
    const uploadImage = async (e) => {
        const imageAccept = ['jpg', 'jpeg', 'png', 'webp'];
        if (e.target.files && e.target.files[0]) {
            const fileExtension = e.target.files[0].name.split('.').pop().toLowerCase();
            if (imageAccept.includes(fileExtension)) {
                const formData = new FormData()
                formData.append('upload', e.target.files[0])
                const response = await fetch(process.env.NEXT_PUBLIC_UPLOAD_URL, {
                    method: 'POST',
                    body: formData
                })
                const data = await response.json()
                returnValue(data.url)
            }
            else {
                alert("Vui lòng chọn ảnh phù hợp với định dạng yêu cầu!")
            }
        }
    }

    return (
        <div className="w-full px-4 mx-auto mt-3">
            <div className="relative w-full mb-3">
                <label className="block uppercase text-gray-200 text-xs font-bold mb-5">
                    {label}
                </label>
                {thumb ? (
                    <img src={thumb} className="rounded-md m-auto w-56 h-40 object-cover"></img>
                ) : (
                    <></>
                )}
                <input accept=".jpg, .jpeg, .webp, .png" id={label} type="file" name="myImage" onChange={uploadImage} hidden/>
                <label className="cursor-pointer dark:bg-white dark:text-black text-white bg-black px-3 py-2 rounded-xl flex mt-3 w-fit mx-auto" type="button" htmlFor={label}>Chọn ảnh</label>
            </div>
        </div>
    )
}

export default UploadImage