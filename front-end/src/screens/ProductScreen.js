import React, { useState, useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'


export default function ProductScreen() {
  // const productId = useParams();
  // const [product, setProduct] = useState([]);
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()
  const match = useParams()
  const navigate = useNavigate()
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, product } = productDetails
  
  useEffect(() => {
      dispatch(listProductDetails(match.id))
      console.log(qty)
  }, [dispatch, match.id])

  const addToCartHandler = () => {
    navigate(`/cart/${match.id}?qty=${qty}`)
  }

  return (
    <div>
      <Link to='/' className='btn btn-dark my-3'>Go Back</Link>
      {loading ? 
        <Loader />
        : error 
        ? <Message variant='danger'>{error}</Message> 
        :(
          <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              Price: $ {product.price}
            </ListGroup.Item>

            {/* <ListGroup.Item> */}
              {/* <div className="form-group"> */}
                {/* <label for="exampleSelect1" class="form-label mt-4">Select one</label> */}
                {/* <select class="form-select" id="exampleSelect1">
                <option value="default">Please select size</option>
                <option value="6''">6''</option>
                <option value="8''">8''</option>
                </select>
              </div>
            </ListGroup.Item> */}

            <ListGroup.Item>
              Description: {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>$ {product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty:</Col>
                    <Col xs='auto' className='my-1'>
                      <Form.Control
                      as='select'
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {
                        [...Array(product.countInStock).keys()].map((x) => (
                          <option key={x+1} value={x+1}>
                            {x+1}
                          </option>
                        ))
                      } 
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button onClick={addToCartHandler} className='btn-block w-100' disabled={product.countInStock===0} type='button'>Add to Cart</Button>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>

        )
      }
    </div>
  )
}

