import { Flex } from '@chakra-ui/react'
import { type } from 'os'
import React from 'react'
import { AuthButtons } from './AuthButtons'
type RightContentProps= {

}
export const RightContent:React.FC<RightContentProps> = () => {
  return (
<>
<Flex justify="center" align="center">
    <AuthButtons/>
</Flex>
</>  )
}
