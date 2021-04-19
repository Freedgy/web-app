/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from "react"

import { UserProvider } from "./src/context/user"

import 'bootstrap/dist/css/bootstrap.min.css';

export const wrapRootElement = ({ element }) => (
    <UserProvider>{element}</UserProvider>
)