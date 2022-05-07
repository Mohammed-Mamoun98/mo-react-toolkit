import React from 'react';
import PropTypes from 'prop-types';
import trans from 'translate';
import { connect } from 'react-redux';
import { createNotification } from '../../../redux/actions/uiActions';
import './WalletValidator.scss';

export const compareTwoStrings = (str_1 = '', str_2 = '') => str_1?.toLowerCase() === str_2?.toLowerCase();

function WalletValidator({ matchWallet, wallet, children, disabled, createNotification, ...rest }) {
  const matchedWallet = compareTwoStrings(matchWallet, wallet) || disabled || !wallet;
  const onMisMatchWalletClick = () => {
    createNotification('error', trans('common.invalid_wallet_address', { wallet: matchWallet }, false, false), 3000);
  };
  return (
    <div className="wallet-validator-wrapper" {...rest}>
      {!matchedWallet && <div onClick={onMisMatchWalletClick} className="un-matched-blocker" />}
      <>{children}</>
    </div>
  );
}
const mapStateToProps = ({ createHPool, wallet }) => ({
  matchWallet: createHPool.hpool.champion_active_web3_address,
  wallet: wallet.account,
});

const mapDispatchToProps = {
  createNotification,
};

WalletValidator.defaultProps = {
  matchWallet: '',
  disabled: false,
};

WalletValidator.propTypes = {
  matchWallet: PropTypes.string,
  wallet: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  createNotification: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletValidator);
