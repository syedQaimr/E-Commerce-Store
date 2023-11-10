import React, { useEffect, useState } from 'react';
import MetaData from '../../components/layout/MetaData';
import { getProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { useAlert } from "react-alert";
import Product from '../../components/product/Product';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import './Product.css';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';


function Products() {

    const alert = useAlert();
    const { loading, error, products, productCount, resultPerPage } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState(0);


    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }
    const categories = [
        "Laptop",
        "Electronic",
        "FoodItem",
        "Cloth",
        "HouseItem",
        "Shoes",
        "SmartPhone"

    ]

    const { keyword } = useParams()

    useEffect(() => {
        if(error){
            return alert.error(error);
        }
        dispatch(getProducts(keyword, currentPage, price, category, rating));
        console.log(price)


    }, [dispatch, keyword, currentPage, price, category , rating , alert , error])

    return (
        <>
            {
                loading ? <Loader /> :
                    <>
                      <MetaData title="Products"/>
                        <h2 className='productsHeading'>Products</h2>
                        <div className='products'>
                            {products && products.map(product => (<Product key={product._id} product={product} />))}
                        </div>
                        <div className='filterBox'>
                            <Typography variant="h5" fontWeight="bold">Price</Typography>
                            <Slider value={price} onChange={priceHandler} valueLabelDisplay='auto' aria-label='range-slider' min={0} max={1500} />
                            <Typography variant="h5" fontWeight="bold">Category</Typography>
                            {categories.map((category1) => (
                                <li className={`${category1 === category ? 'category-active-link' : 'category-link'}`} 
                                key={category1} onClick={() => setCategory(category1)}>
                                    {category1}
                                </li>
                            ))}

                            <Typography component="legend" variant="h5" fontWeight="bold">
                                Ratings above
                            </Typography>
                            <Slider value={rating} onChange={(e, newRating) => { setRating(newRating); }} valueLabelDisplay='auto' aria-label='continuous-slider' min={0} max={5} />
                        </div>

                        {
                            resultPerPage < productCount && (
                                <div className='paginationBox'>
                                    <Pagination
                                        activePage={currentPage}
                                        timeCountPerPage={resultPerPage}
                                        totalItemsCount={productCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText="Next"
                                        prevPageText="Prev"
                                        lastPageText="Last"
                                        firstPageText="First"
                                        itemClass='page-item'
                                        linkClass='page-link'
                                        activeClass='pageItemActive'
                                        activeLinkClass='pageLinkActive' />
                                </div>
                            )
                        }
                    </>
            }
        </>
    )
}

export default Products