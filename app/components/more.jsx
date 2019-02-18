
require('./more.css');
require('../lib/swiper.min.css');
let Swiper = require('../lib/swiper.min.js');
import React from 'react'; 
import axios from 'axios';

class MoreComponent extends React.Component{
	constructor(props){
		super(props);

		this.source = "http://localhost:3000/data/more";

		this.state = {
        	more1: [],
        	more2: [],
        	more3: [],
		};
	}

	componentDidMount() {
		axios.get(this.source)
		.then((response) => {
			return response.data;
		})
		.then((data) => {
			console.log(data)
			if(data.status) {
				this.setState({
					more1: data.data.slice(0,3),
					more2: data.data.slice(3,5),
					more3: data.data.slice(5,7),
				})
				new Swiper ('.more_bottom .swiper-container', {
					loop: true,
					pagination: '.swiper-pagination',
					paginationClickable: true,
					autoplay : 2000,
					autoplayDisableOnInteraction : false,		    
				}) 
			}else {
				alert(data.msg);
			}
		})
		.catch(() => {
			console.log("fetch encounter error!");
		});
	}

	render() {

		let countId = 0;
		return (
			<div id="more">
				<div className="more_top">
					{
						this.state.more1.map((item) => {
							return <div className="more_link" key={"more" + countId++}>
										<a href={item.url}>
											<img src={item.icon} alt=""/>
										</a>
									</div>
						})
					}
				</div>
				<div className="more_middle">
					{
						this.state.more2.map((item) => {
							return <div className="more_style" key={"more" + countId++}>
										<a href={item.url}>
											<img src={item.icon} alt=""/>
										</a>
									</div>
						})
					}
				</div>
				<div className="more_bottom">
					<div className="swiper-container">
						<div className="swiper-wrapper">
							{
								this.state.more3.map((item) => {
									return  <div className="swiper-slide" key={"more" + countId++}>
												<a href={item.url}>
													<img src={item.icon} alt=""/>
												</a>
											</div>
								})
							}
						</div>
						<div className="swiper-pagination"></div>
					</div>
				</div>
			</div>
		);
	}
}

module.exports = MoreComponent;