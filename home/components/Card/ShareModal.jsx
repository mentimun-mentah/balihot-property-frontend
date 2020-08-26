import { useState, useCallback } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { EmailShareButton, FacebookShareButton } from "react-share";
import { TelegramShareButton, TwitterShareButton, WhatsappShareButton, } from "react-share";
import { EmailIcon, FacebookIcon, TelegramIcon, TwitterIcon, WhatsappIcon, } from "react-share";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ShareModal = ({ link }) => {
  const [copy, setCopy] = useState('Copy Link')

  const copyHandler = useCallback(() => {
    setCopy('Link Copied!')
    setTimeout(() => {
      setCopy('Copy Link')
    }, 4000)
  },[])

  return (
    <>
      <ListGroup variant="flush">
        <CopyToClipboard onCopy={copyHandler} text={link} >
          <ListGroup.Item className="share-button border-0 hov_pointer">
            <i className="fas fa-copy fa-fw ic-copy"></i> <span className="ml-2 fs-14 fw-500">{copy}</span>
          </ListGroup.Item>
        </CopyToClipboard>
        <EmailShareButton url={link} className="w-100 text-left share-button">
          <ListGroup.Item className="share-button border-0">
            <EmailIcon size={32} /> <span className="ml-2 fs-14 fw-500">Share on Email</span>
          </ListGroup.Item>
        </EmailShareButton>
        <FacebookShareButton url={link} className="w-100 text-left share-button">
          <ListGroup.Item className="share-button border-0">
            <FacebookIcon size={32} /> <span className="ml-2 fs-14 fw-500">Share on Facebook</span>
          </ListGroup.Item>
        </FacebookShareButton>
        <TwitterShareButton url={link} className="w-100 text-left share-button">
          <ListGroup.Item className="share-button border-0">
            <TwitterIcon size={32} /> <span className="ml-2 fs-14 fw-500">Share on Twitter</span>
          </ListGroup.Item>
        </TwitterShareButton>
        <WhatsappShareButton url={link} className="w-100 text-left share-button">
          <ListGroup.Item className="share-button border-0">
            <WhatsappIcon size={32} /> <span className="ml-2 fs-14 fw-500">Share on Whatsapp</span>
          </ListGroup.Item>
        </WhatsappShareButton>
        <TelegramShareButton url={link} className="w-100 text-left share-button">
          <ListGroup.Item className="share-button border-0">
            <TelegramIcon size={32} /> <span className="ml-2 fs-14 fw-500">Share on Telegram</span>
          </ListGroup.Item>
        </TelegramShareButton>
      </ListGroup>
      <style jsx>{`
        :global(.share-button:hover){
          background-color: #fafafa;
        }
        :global(.share-button:focus){
          background-color: #efefef;
        }
        .ic-copy{
          width: 32px;
          height: 32px;
          font-size: 18px;
          text-align: center;
          vertical-align: middle;
          display: inline-block;
          background: steelblue;
          line-height: 1.7;
          color: white;
        }
      `}</style>
    </>
  )
}

export default ShareModal;
