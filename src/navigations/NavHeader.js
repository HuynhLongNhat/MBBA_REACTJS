import "./NavHeader.scss"
import React, { useState } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

const NavHeader = () => {
    const [closeHideCart, setCloseHideCart] = useState(false);
    const handleShowHideCart = () => {
        setCloseHideCart(!closeHideCart)
    }
    return (
        <div className="nav-header-container">
            <div className="nav-header">
                <Navbar bg="header">
                    <Container>
                        <Navbar.Brand href="#" className="navbar-brand">
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">

                                <NavLink to="/" className="nav-link"><i className="fa fa-home px-1"></i>Trang chủ</NavLink>
                                <NavLink to="/news" className="nav-link"><i className="fa fa-newspaper-o px-1"></i>Tin tức</NavLink>
                                <NavLink to="/introduce" className="nav-link"><i className="fa fa-info-circle px-1"></i>Giới thiệu</NavLink>
                                <NavLink to="/product" className="nav-link">Sản phẩm</NavLink>

                            </Nav>

                            <Nav>

                                <>
                                    <Nav.Item className="nav-link">Chào mừng Long Nhat</Nav.Item>
                                    <NavDropdown title="Tài khoản" id="basic-nav-dropdown">
                                        <NavDropdown.Item >Thông tin cá nhân</NavDropdown.Item>
                                        <NavDropdown.Item >Đổi mật khẩu</NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item><span>Đăng xuất</span></NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

        </div >
    );
}
export default NavHeader;