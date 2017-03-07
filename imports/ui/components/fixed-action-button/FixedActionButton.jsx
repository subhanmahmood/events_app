import React, { Component } from 'react';

export default class FixedActionButton extends Component {

   render( ) {
      const styles = this.props.color + " btn-floating btn-large";
      return (
         <div className="fixed-action-btn">
            <a className={styles} href={this.props.path}>
               <i className="large material-icons">{this.props.iconName}</i>
            </a>
         </div>
      )
   }
}
