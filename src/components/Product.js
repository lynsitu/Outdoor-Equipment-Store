import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import products from '../products'

function Product( { product }) {
    return (
        <Card className="my-3 p-3 rounded">
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} /> 
            </Link>

            <Card.Body>

                <Link to={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text>
                    <div as="h3">
                        ${product.price}
                    </div>
                </Card.Text>


            </Card.Body>
        </Card>
    )
}

export default Product