import { Decimal } from '@openware/components';
import * as React from 'react';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Grid } from '../../../components/Grid';
import { ToolBar, TradingChart, WalletsFetch } from '../../../containers';
import { OpenOrdersPanel, OrderBook, OrderComponent } from '../../containers';

import { getUrlPart, setDocumentTitle } from '../../../helpers';
import {
    RootState,
    selectCurrentMarket,
    selectMarketTickers,
    selectUserInfo,
    selectUserLoggedIn,
    setCurrentMarket,
    setCurrentPrice,
    Ticker,
    User,
} from '../../../modules';
import { GridLayoutState, saveLayouts, selectGridLayoutState } from '../../../modules/public/gridLayout';
import { Market, marketsFetch, selectMarkets } from '../../../modules/public/markets';
import { depthFetch } from '../../../modules/public/orderBook';
import { rangerConnectFetch, RangerConnectFetch } from '../../../modules/public/ranger';
import { RangerState } from '../../../modules/public/ranger/reducer';
import { selectRanger } from '../../../modules/public/ranger/selectors';
import { selectWallets, Wallet, walletsFetch } from '../../../modules/user/wallets';

const breakpoints = {
    lg: 1200,
    md: 996,
    sm: 768,
    xs: 480,
    xxs: 0,
};

const cols = {
    lg: 24,
    md: 24,
    sm: 12,
    xs: 12,
    xxs: 12,
};

interface ReduxProps {
    currentMarket: Market | undefined;
    markets: Market[];
    wallets: Wallet[];
    user: User;
    rangerState: RangerState;
    userLoggedIn: boolean;
    rgl: GridLayoutState;
    tickers: {
        [pair: string]: Ticker;
    };
}

interface DispatchProps {
    depthFetch: typeof depthFetch;
    marketsFetch: typeof marketsFetch;
    accountWallets: typeof walletsFetch;
    rangerConnect: typeof rangerConnectFetch;
    setCurrentPrice: typeof setCurrentPrice;
    setCurrentMarket: typeof setCurrentMarket;
    saveLayouts: typeof saveLayouts;
}

interface StateProps {
    orderComponentResized: number;
}

type Props = DispatchProps & ReduxProps & RouteComponentProps;

// tslint:disable:jsx-no-lambda
class Trading extends React.Component<Props, StateProps> {
    public readonly state = {
        orderComponentResized: 10,
    };

    private gridItems = [
        {
            i: 1,
            render: () => <OrderComponent size={this.state.orderComponentResized} />,
        },
        {
            i: 2,
            render: () => <TradingChart />,
        },
        {
            i: 3,
            render: () => <OrderBook />,
        },
        {
            i: 4,
            render: () => <OpenOrdersPanel />,
        },
    ];

    public componentDidMount() {
        setDocumentTitle('Trading');
        const {
            wallets,
            markets,
            currentMarket,
            userLoggedIn,
            rangerState: { connected },
        } = this.props;

        if (markets.length < 1) {
            this.props.marketsFetch();
        }
        if (!wallets || wallets.length === 0) {
            this.props.accountWallets();
        }
        if (currentMarket) {
            this.props.depthFetch(currentMarket);
        }
        if (!connected) {
            this.props.rangerConnect({ withAuth: userLoggedIn });
        }
        if (!userLoggedIn && currentMarket) {
            this.props.history.replace(`/trading/${currentMarket.id}`);
        }
    }

    public componentWillUnmount() {
        this.props.setCurrentPrice(undefined);
    }

    public componentWillReceiveProps(nextProps) {
        const { currentMarket, history, markets, userLoggedIn } = this.props;

        if (userLoggedIn !== nextProps.userLoggedIn) {
            this.props.rangerConnect({ withAuth: nextProps.userLoggedIn });
        }

        if (markets.length !== nextProps.markets.length) {
            this.setMarketFromUrlIfExists(nextProps.markets);
        }

        if (nextProps.currentMarket && currentMarket !== nextProps.currentMarket) {
            history.replace(`/trading/${nextProps.currentMarket.id}`);
            this.props.depthFetch(nextProps.currentMarket);
        }

        if (nextProps.currentMarket && nextProps.tickers) {
            this.setTradingTitle(nextProps.currentMarket, nextProps.tickers);
        }
    }

    public render() {
        const rowHeight = 14;
        const allGridItems = [...this.gridItems];
        const { rgl, userLoggedIn } = this.props;

        return (
            <div className={'pg-trading-screen'}>
                <div className={'pg-trading-wrap'}>
                    <ToolBar />
                    <Grid
                        breakpoints={breakpoints}
                        className="layout"
                        children={allGridItems}
                        cols={cols}
                        draggableHandle=".cr-table-header__content, .pg-trading-screen__tab-panel, .draggable-container"
                        layouts={rgl.layouts}
                        rowHeight={rowHeight}
                        // tslint:disable-next-line: jsx-no-multiline-js
                        onLayoutChange={() => {
                            return;
                        }}
                        handleResize={this.handleResize}
                    />
                    {userLoggedIn && <WalletsFetch />}
                </div>
            </div>
        );
    }

    private setMarketFromUrlIfExists = (markets: Market[]): void => {
        const urlMarket: string = getUrlPart(2, window.location.pathname);
        const market: Market | undefined = markets.find(item => item.id === urlMarket);

        if (market) {
            this.props.setCurrentMarket(market);
        }
    };

    private setTradingTitle = (market: Market, tickers: ReduxProps['tickers']) => {
        const tickerPrice = tickers[market.id] ? tickers[market.id].last : '0.0';
        document.title = `${Decimal.format(tickerPrice, market.price_precision)} ${market.name}`;
    };

    private handleResize = (layout, oldItem, newItem) => {
        switch (oldItem.i) {
            case '1':
                this.setState({
                    orderComponentResized: newItem.w,
                });
                break;
            default:
                break;
        }
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    currentMarket: selectCurrentMarket(state),
    markets: selectMarkets(state),
    wallets: selectWallets(state),
    user: selectUserInfo(state),
    rangerState: selectRanger(state),
    userLoggedIn: selectUserLoggedIn(state),
    rgl: selectGridLayoutState(state),
    tickers: selectMarketTickers(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = dispatch => ({
    marketsFetch: () => dispatch(marketsFetch()),
    depthFetch: payload => dispatch(depthFetch(payload)),
    accountWallets: () => dispatch(walletsFetch()),
    rangerConnect: (payload: RangerConnectFetch['payload']) => dispatch(rangerConnectFetch(payload)),
    setCurrentPrice: payload => dispatch(setCurrentPrice(payload)),
    setCurrentMarket: payload => dispatch(setCurrentMarket(payload)),
    saveLayouts: payload => dispatch(saveLayouts(payload)),
});

const TradingScreen = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
    // tslint:disable-next-line: no-any
)(Trading) as any);

export { TradingScreen };
