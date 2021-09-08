import React, { Component } from 'react';

class Pagination extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage: this.props.page ? this.props.page : 1,
      pages: 0,
    }

    this.getPagination = this.getPagination.bind(this);
    this.onClick = this.onClick.bind(this);
    //this.calculatePages = this.calculatePages.bind(this);
  }
  componentDidMount(){
    const count = this.props.count;
    let pages = Math.ceil(count / this.props.perPage);
    if(pages !== this.state.pages){
      this.setState({
        pages: pages,
      })
    }
  }
  onClick(e, page){
    e.preventDefault();
    const currentPage = this.state.currentPage;
    const pages = this.state.pages;
    let changeTo;

    if(page === 'previous' || page === 'next'){
      changeTo = page === 'previous' ? currentPage - 1 : currentPage + 1;
    } else {
      changeTo = page;
    }

    if(changeTo <= pages){
      this.setState({
        currentPage: changeTo,
      }, function(){
        if(this.props.onChange){
          this.props.onChange(changeTo);
        }
      })
    }

  }
  getPagination(){
    const current =  this.state.currentPage; 
    const range = this.state.pages >= 5 ? 5 : this.state.pages;
    const pages = this.state.pages;
    const start = 1;
    let paging = [];
    let pagesToShow = [];

    var i = Math.min(pages + start - range, Math.max(start, current - (range / 2 | 0)));
    const end = i + range;
    while (i < end) { 
      paging.push(i++); 
    }

    paging.map((num, i) => {
      let paginationSingular = (
        <li key={("page-num-" + i)} className={'page-item' + (num === current ? ' active' : '')}>
          <a className="page-link" href="#" onClick={e => this.onClick(e, num)} >{num}</a>
        </li>
      );
      pagesToShow.push(paginationSingular);
    });

    const lastPage = (
      <li key="last-page" className={'page-item'}>
        <a className="page-link" href="#" onClick={e => this.onClick(e, pages)} >{ ">>" }</a>
      </li>
    );

    const firstPage = (
      <li key="first-page" className={'page-item'}>
        <a className="page-link" href="#" onClick={e => this.onClick(e, 1)} >{ "<<" }</a>
      </li>
    );

    if(!paging.includes(pages)){
      pagesToShow.push(lastPage); 
    }

    if(!paging.includes(1)){
      pagesToShow.unshift(firstPage); 
    }

    return pagesToShow;

       
  }
  render() {
    let pages = this.state.pages;
    if(pages > 0){
      return (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={'page-item' + (this.state.currentPage === 1 ? ' disabled' : '')}>
              <a className="page-link" href="#" tabIndex="-1" onClick={e => this.onClick(e, 'previous')} >Anterior</a>
            </li>
            {this.getPagination()}
            <li className={'page-item' + (this.state.pages === this.state.currentPage ? ' disabled' : '')}>
              <a className="page-link" href="#" onClick={e => this.onClick(e, 'next')} >Siguiente</a>
            </li>        
          </ul>
        </nav>
      );
    } else {
      return '';
    }
    
  };
}

export default Pagination;
