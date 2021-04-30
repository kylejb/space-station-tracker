import Canvas from 'components/canvas/Canvas';
import EarthContainer from 'containers/EarthContainer/Earth';
import SearchContainer from 'containers/SearchContainer';
import Main from 'components/layouts/Main';

const Index = () => {
    <Main>
        <Canvas id="globe-canvas" />
        <SearchContainer />
        <EarthContainer />
    </Main>
}

export default Index;
