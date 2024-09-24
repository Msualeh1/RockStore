import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Cards from './Cards';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import './App.css'; // Import custom CSS for card styling

const App = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://3.26.215.90:5000/api/categories');
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const cardImages = [
        '/apparel1.png',
        '/belt3.png',
        '/light.png',
        '/brake1.png',
        '/cooling1.png',
        '/drivetrain.png'
    ];

    const cardData = categories.map((category, index) => ({
        title: category.name,
        imgSrc: cardImages[index % cardImages.length],
        slug: category.slug
    }));

    return (
        <div className='exper'>
            <Container>
                <Row>
                    {/* Text Section */}
                    <Col xs={12} md={6} className="mb-4" style={{ paddingRight: '5rem' }}>
                        <p style={{ fontSize: '25px', lineHeight: '2', whiteSpace: 'pre-wrap', color: "white", marginTop: '3rem', marginLeft: "1rem" }}>
                            Discover an extensive range {'\n'}of premium car spare parts{'\n'}
                            delivered right to your doorstep {'\n'}fast, easy, and hassle-free!
                        </p>
                        <button type="button" className="btn btn-primary btn-lg btn-dark" style={{backgroundColor:'#00b7c5'}}>Get Help</button>
                    </Col>

                    {/* Cards Section */}
                    <Col xs={12} md={6}>
                        <Container className="card-section">
                            <Row className="justify-content-center">
                                {/* Header Section */}
                                <Col xs={12} className="text-left-section mb-4">
                                    <div className='banner'>
                                        <FontAwesomeIcon icon={faList} className='cat-icon' style={{ color: "white" }} />
                                        <h3 style={{ margin: '0px', paddingLeft: '1rem', color: "white" }}>Explore Categories</h3>
                                    </div>
                                </Col>

                                {/* Cards */}
                                <Col xs={12}>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>Error: {error}</p>}
                                    <Row className="justify-content-center">
                                        {cardData.map((card, index) => (
                                            <Col
                                                key={index}
                                                xs={12}  /* Full width on extra small screens */
                                                sm={6}   /* 50% width on small screens */
                                                md={6}   /* 50% width on medium screens */
                                                lg={4}   /* 33% width on large screens */
                                                xl={4}   /* 33% width on extra-large screens */
                                                className="mb-4 d-flex justify-content-center"
                                            >
                                                <Link to={`/${card.slug}`}>
                                                    <Cards title={card.title} imgSrc={card.imgSrc} style={{
                                                        color: "black",
                                                        minHeight: '200px',
                                                        maxWidth: '300px',
                                                        width: '100%' /* Ensure card takes full width within its column */
                                                    }} />
                                                </Link>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>



    )
}
export default App;
