import React from 'react'

import {Col, Card, CardHeader, CardBody} from 'reactstrap'

const CommandCard = ({HeaderIcon, headerText, commands}) => {
  return (
    <Col className="mb-4">
      <Card className="text-center">
        <CardHeader>
          <p>
            <HeaderIcon size="5em" />
          </p>
          <h3>{headerText}</h3>
        </CardHeader>
        {commands.map(command => (
          <CardBody>{command}</CardBody>
        ))}
      </Card>
    </Col>
  )
}

export default CommandCard
