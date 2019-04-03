import React from 'react';
import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';


const products = ({ data: { allContentfulGatsbyGarbProduct }}) => { 
  return (
    <Layout>
      <div>
        <h2>Garb Products</h2>
        {/* Product List */}
        {allContentfulGatsbyGarbProduct.edges.map (({ node: product }) => (
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

export const query = graphql`
{
  allContentfulGatsbyGarbProduct {
    edges {
      node {
        id
        slug
        name
        price
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
export default products;