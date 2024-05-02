import { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";



import CommonUtils from ".././../../../../utils/CommonUtils"
import "./ManageProduct.scss"
const ManageProduct = () => {
    const [name, setName] = useState('');
    const [descriptionHTML, setDescriptionHTML] = useState('');
    const [descriptionMarkdown, setDescriptionMarkdown] = useState('');
    const [listTypeProduct, setListTypeProduct] = useState([])
    const [selectedTypeProduct, setSeclectedTypeProduct] = useState('')
    const [quantity, setQuantity] = useState(0);
    const [cost, setCost] = useState(0)
    const [imageBase64, setImageBase64] = useState('')
    const [image, setImage] = useState('');


    const handleSaveNewProduct = () => {

    }
    const handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            setImageBase64(base64)
            setImage(objectUrl)

        }
    }

    return (<>
        <div className="manage-product-container">
            <div className=" mt-3 ms-title">Quản lí sản phẩm </div>

            <div className="add-new-product row">
                <div className="col-4 form-group">
                    <label>Tên sản phẩm</label>
                    <input
                        className="form-control"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="col-4 form-group">
                    <label>Loại sản phẩm </label>
                    <input
                        className="form-control"
                        type="text"

                    />
                </div>


                <div className="col-4 form-group">
                    <label>Số lượng </label>
                    <input
                        className="form-control"
                        type="text"
                        value={quantity}
                        onChange={(event) => setQuantity(event.target.value)}
                    />
                </div>
                <div className="col-4 form-group mt-3">
                    <label>Giá </label>
                    <input
                        className="form-control"
                        type="text"
                        value={cost}
                        onChange={(event) => setCost(event.target.value)}
                    />
                </div>
                <div className="col-4 mt-3">
                    <label>
                        Ảnh sản phẩm
                    </label>
                    <div className="preview-img-container">
                        <input
                            hidden
                            id="previewImg"
                            type="file"
                            // value={image}
                            onChange={(event) => handleOnchangeImage(event)}
                        />
                        <label className="label-upload" htmlFor="previewImg">
                            Tải ảnh <i className="fa-solid fa-upload"></i>
                        </label>
                        <div
                            className="preview-image"
                            style={{
                                backgroundImage: `url(${image})`,
                            }}

                        ></div>
                    </div>
                </div>
                <div className="col-12 mt-5">
                    <label>Mô tả</label>

                </div>
                <div className="col-12">
                    <button
                        className="btn-save-product"
                        onClick={() => handleSaveNewProduct()}
                    >
                        Save
                    </button>
                    <div className="col-12 mb-5">

                    </div>
                </div>
            </div>

        </div>


    </>);
}

export default ManageProduct;