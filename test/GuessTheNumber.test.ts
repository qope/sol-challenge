import { ethers } from 'hardhat'
import { BigNumber } from 'ethers'
import { expect } from 'chai'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { GuessTheNumberChallenge } from '../typechain-types'

describe('GuessTheNumberChallenge', async function () {
  let player: SignerWithAddress
  let challenge: GuessTheNumberChallenge

  before(async function () {
    ;[player] = await ethers.getSigners()

    const Challenge = await ethers.getContractFactory('GuessTheNumberChallenge')
    challenge = (await Challenge.deploy()) as GuessTheNumberChallenge
  })

  it('Attack', async function () {
    const MAX_UINT256 = BigNumber.from("2").pow(256)
    const a = BigNumber.from("0") 
    const b = MAX_UINT256.sub(1000)
    await challenge.input(a, b)
    expect(await challenge.isSolved()).to.be.true
  })
})
