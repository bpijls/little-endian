import React from 'react';
import './Sidebar.css';

import profilePic from '../img/profile.png';
import rankIcon from '../img/rank-icon.png';

class Sidebar extends React.Component {

    categories = this.props.categories;
    //console.log(categories);

    //This function adds a class "toggled" and collapses the sidebar
    toggleSidebar = () => {
        var sidebar_wrapper = document.getElementById("sidebar-wrapper");
        sidebar_wrapper.classList.toggle("toggled");
        var content_wrapper = document.getElementById("content-wrapper");
        content_wrapper.classList.toggle("toggled");
    }

    activateCategory = (activeCategory) => {
        var categories = this.props.categories;
        for (let key in categories) {
            categories[key].isActive = false;
        }
        activeCategory.isActive = true;
        this.props.updateCategories(categories);
    }

    render() {
        return (
            <div id="sidebar-container">
                <div id="top-container">
                    <div onClick={this.toggleSidebar} className="btn-toggleSidebar">
                        <span className="fa fa-chevron-right category-icon"></span>
                    </div>
                </div>               

                <div id="categories-container">
                    <div className="category-container ">
                        <div className={this.categories.freeCoding.isActive ? "category-btn active" : "category-btn"} onClick={() => this.activateCategory(this.categories.freeCoding)}>
                            <div className="category-name free-coding-name">
                                FREE CODING
                        </div>
                            <div className="category-icon-container">
                                <span className="fa fa-code category-icon"></span>
                            </div>
                        </div>
                    </div>

                    <div className="category-container">
                        <div className={this.categories.settings.isActive ? "category-btn active" : "category-btn"} onClick={() => this.activateCategory(this.categories.settings)}>
                            <div className="category-name settings-name">
                                SETTINGS
                        </div>
                            <div className="category-icon-container">
                                <span className="fa fa-cog category-icon"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;