import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap is imported

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (searchTerm.trim() === '') return; // Ignore empty search

        setLoading(true);
        setError(null); // Reset error state before new search

        try {
            // Correct URL for fetching search results
            const response = await fetch(`http://localhost:5000/search?query=${encodeURIComponent(searchTerm)}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();  // This should contain the products from the nested structure
            setSearchResults(data);  // Set the search results in state
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleSearch} style={{backgroundColor:"#4682B4", border:'none'}}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            <span className="ms-2">Search</span>
                        </button>
                    </div>
                </div>
            </div>

            {loading && <p className="mt-3">Loading...</p>}
            {error && <p className="mt-3 text-danger">{error}</p>}

            {searchResults.length > 0 && (
                <div className="mt-4">
                    <h5>Search Results:</h5>
                    <div className="row" style={{display:'flex', justifyContent:'space-between'}}>
                        {searchResults.map((product) => (
                            <div key={product.id} className="col-md-4 col-sm-6 mb-3">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">{product.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div> 
                </div>
            )}

            {searchResults.length === 0 && !loading && !error && searchTerm && (
                <p className="mt-3"> "{searchTerm}"</p>
            )}
        </div>
    );
};

export default SearchBar;
