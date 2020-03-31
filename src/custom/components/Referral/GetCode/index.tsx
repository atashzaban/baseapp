import * as React from 'react';
import facebook = require('../../../assets/images/referral/icons-yellow/facebook.svg');
import instagram = require('../../../assets/images/referral/icons-yellow/instagram.svg');
import linkedin = require('../../../assets/images/referral/icons-yellow/linkedin.svg');
import medium = require('../../../assets/images/referral/icons-yellow/medium.svg');
import reddit = require('../../../assets/images/referral/icons-yellow/reddit.svg');
import telegram = require('../../../assets/images/referral/icons-yellow/telegram.svg');
import twitter = require('../../../assets/images/referral/icons-yellow/twitter.svg');
import graphic = require('../../../assets/images/referral/referral-graphic.svg');
//tslint:disable
const GetCode = props => {
    return (
        <section id="get-code">
            <div className="container_">
                <div>
                    <img src={graphic} alt="" style={{ maxWidth: '100%' }} />
                </div>
                <div>
                    <h2>{props.intl.formatMessage({ id: 'get.get_now' })}</h2>
                    <p>
                        {props.intl.formatMessage({ id: 'get.watch' })} <b>#WinWithEmirex</b>
                    </p>
                    <p>
                        <b>{props.intl.formatMessage({ id: 'get.follow' })}</b>
                    </p>
                    <div className="social">
                        <div>
                            <a href="https://www.facebook.com/emirex.official/" target="_blank" rel="nofollow noopener">
                                <img src={facebook} alt="" />
                            </a>
                            <a href="https://www.instagram.com/emirex_official/" target="_blank" rel="nofollow noopener">
                                <img src={instagram} alt="" />
                            </a>
                            <a href="https://twitter.com/EMIREX_OFFICIAL" target="_blank" rel="nofollow noopener">
                                <img src={twitter} alt="" />
                            </a>
                            <a href="tg://resolve?domain=emirex_official" target="_blank" rel="nofollow noopener">
                                <img src={telegram} alt="" />
                            </a>
                        </div>
                        <div>
                            <a href="https://medium.com/@EMIREX_OFFICIAL" target="_blank" rel="nofollow noopener">
                                <img src={medium} alt="" />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/emirexgroup/?viewAsMember=true"
                                target="_blank"
                                rel="nofollow noopener"
                            >
                                <img src={linkedin} alt="" />
                            </a>
                            <a
                                href="https://www.reddit.com/user/Emirex__official/comments/d1vsum/introducing_the_next_stage_in_the_technology_roll/"
                                target="_blank"
                                rel="nofollow noopener"
                            >
                                <img src={reddit} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="terms">
                <h3>{props.intl.formatMessage({ id: 'get.h3' })}</h3>
                <p dangerouslySetInnerHTML={{ __html: `${props.intl.formatMessage({ id: 'get.text1' })}` }} />
                <p>{props.intl.formatMessage({ id: 'get.text2' })}</p>
                <p>{props.intl.formatMessage({ id: 'get.text3' })} </p>
                <p dangerouslySetInnerHTML={{ __html: `${props.intl.formatMessage({ id: 'get.text4' })}` }} />
            </div>
        </section>
    );
};

export { GetCode };
