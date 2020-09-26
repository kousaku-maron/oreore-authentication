import { NextApiRequest, NextApiResponse } from 'next'
import * as jwt from 'jsonwebtoken'
import vision from '@google-cloud/vision'

const payload = {
  email: 'oreore@oreore.com',
  name: 'oreore',
}

const secret = 'oreore'

const credentials = JSON.parse(Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64, 'base64').toString())

const token = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = new vision.ImageAnnotatorClient({ credentials })

  const body = JSON.parse(req.body)
  const image = body.image

  const buffer = Buffer.from(image, 'base64')

  const [result] = await client.faceDetection(buffer)
  const annotations = result.faceAnnotations

  if (annotations.length === 0) {
    // return res.status(401).json({ success: false, message: '顔を見せてください。', token: null })
    return res.status(401).json({ success: false, message: 'エラー、さぁもっと挑戦してください', token: null })
  }

  if (annotations.length > 1) {
    // return res.status(401).json({ success: false, message: '一人だけにしてください。', token: null })
    return res.status(401).json({ success: false, message: 'エラー、さぁもっと挑戦してください', token: null })
  }

  const annotation = annotations[0]
  const joyLikelihood = annotation.joyLikelihood

  if (joyLikelihood !== 'VERY_LIKELY' && joyLikelihood !== 'LIKELY') {
    // return res.status(401).json({ success: false, message: '笑ってください。', token: null })
    return res.status(401).json({ success: false, message: 'エラー、惜しい。', token: null })
  }

  const token = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: '12h' })

  res.status(200).json({ success: true, message: '笑顔の人で悪い人はいません。', token })
}

export default token
