import React from 'react'
import { Helmet } from "react-helmet-async";

const ReactHelmet = ({pageName,}) => {
  return (
        <Helmet>
        <title>{pageName}</title>
      </Helmet>
  )
}

export default ReactHelmet;