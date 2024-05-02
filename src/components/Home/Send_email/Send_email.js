const Send_email = () => {
    return (<>
        <div className='bottom-form mt-3'>
            <p className='title-1'>Nhận thông tin về sản phẩm mới nhất</p>
            <p className='title-2'>Vui lòng nhập Email, chúng tôi sẽ gửi thông tin và báo giá ngay !</p>
            <div className='form-email'>
                <input className='form-control mx-2' placeholder='Nhập email'></input>
                <button className='btn btn-send-email'>Gửi</button>
            </div>
        </div></>);
}

export default Send_email;