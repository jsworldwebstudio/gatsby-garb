import React, { Component } from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import netlifyIdentity from 'netlify-identity-widget';

import Layout from '../components/layout';


class Products extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    this.getProducts();
    netlifyIdentity.on('login', user => this.getProducts(user));
    netlifyIdentity.on('logout', () => this.getProducts());
  }

  getProducts = user => {
    const allProducts = this.props.data.allContentfulGatsbyGarbProduct.edges;
    const products = netlifyIdentity.currentUser() !== null ?
      allProducts : allProducts.filter(({ node: product }) => !product.private );
    this.setState({ products });
  };

  render() {
    // const { data: { allContentfulGatsbyGarbProduct }} = this.props;
    const { products } = this.state;

  return (
    <Layout>
      <div>
        <h2>Garb Products</h2>
        {/* Product List */}
        {products.map (({ node: product }) => (
          <div
            style={{ marginBottom: 20 }}
            key={product.id}
          >
            <Link to={`/products/${product.slug}`} style={{
              textDecoration: 'none', color: '#551a8b'
            }}>
              <h3>{product.name} -{' '}<span style={{
                fontSize: '1.2rem',
                fontWeight: 300,
                color: '#f60'
              }}>${product.price}</span></h3>
            </Link>
            <Img
              style={{ maxWidth: 400 }}
              fluid={product.image.fluid}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};
}

export const query = graphql`
{
  allContentfulGatsbyGarbProduct {
    edges {
      node {
        id
        slug
        name
        price
        private
        image {
          fluid(maxWidth: 400) {
            ...GatsbyContentfulFluid_tracedSVG
          }
        }
      }
    }
  }
}
`
export default Products;