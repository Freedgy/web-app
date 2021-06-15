import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import Button from '@material-ui/core/Button';
import userContext from "../context/user";

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"

class IndexPage extends React.Component {
  render () {
    const { signOut } = this.context
    return (
    <Layout>
      <Seo title="Home" />
        <Button 
            variant="contained"
            color="primary"
            onClick={signOut}
        >
            Logout
        </Button>
      <p>
        <Link to="/page-2/">Go to page 2</Link> <br />
      </p>
    </Layout>)}
}

IndexPage.contextType = userContext

export default IndexPage
