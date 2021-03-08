import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
// YouTube API key
const API_KEY = 'AIzaSyBBHCicOT7jEEt150ZipBSG8npecDKiMj8';

// Create a new component. This component should produce
// some HTML
class App extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
         };

         this.videoSearch('surfbords');

    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            // this.setState({ videos }); // this.setState({ videos: videos });
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

        return (
            <div>
                {/* <SearchBar onSearchTermChange={term => this.videoSearch(term)} /> */}
                <SearchBar onSearchTermChange={videoSearchS} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}

// Take this component's generated HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));


