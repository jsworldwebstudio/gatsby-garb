import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';

const ProductTemplate = ({ data: {contentfulGatsbyGarbProduct}, location }) => (
  <Layout>
    <div
      style={{
        marginLeft: '0 auto',
        width: '100%',
        textAlign: 'center'
      }}
    >
      {/* Product Info */}
      <h2>{contentfulGatsbyGarbProduct.name} - <span style={{color: '#ccc'}}
      >Added on {contentfulGatsbyGarbProduct.createdAt}</span></h2>
      <h4>${contentfulGatsbyGarbProduct.price}</h4>
      <p>{contentfulGatsbyGarbProduct.description}</p>
      <button
        style={{
          background: 'darkorange',
          color: 'white',
          padding: '0.3em',
          borderRadius: '5px',
          marginBottom: '10px',
          cursor: 'pointer'
        }}
        className="snipcart-add-item"
        data-item-id={contentfulGatsbyGarbProduct.slug}
        data-item-price={contentfulGatsbyGarbProduct.price}
        data-item-image={contentfulGatsbyGarbProduct.image.file.url}
        data-item-name={contentfulGatsbyGarbProduct.name}
        data-item-url={location.pathname}
      >
        Add to Cart
      </button>
      <Img
        style={{ margin: '0 auto', maxWidth: 600 }}
        fluid={contentfulGatsbyGarbProduct.image.fluid}
      />
    </div> 
  </Layout>
);

export const query = graphql`
query($slug: String!) {
	contentfulGatsbyGarbProduct(slug:{ eq: $slug }) {
  	slug
    name
    price
    description
    createdAt(formatString: "MMMM Do, YYYY, h:mm:ss:a")
    image {
      fluid(maxWidth: 800) {
        ...GatsbyContentfulFluid
      }
      file {
        url
      }
    }
  }
}
`

export default ProductTemplate;