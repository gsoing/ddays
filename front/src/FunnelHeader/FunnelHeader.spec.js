import React from 'react';
import renderer from 'react-test-renderer';
import FunnelHeader from './FunnelHeader';

jest.mock('../../../common/Link/Link', () => jest.fn(({ children }) => <div>Link component:{children}</div>));

describe('funnel header component', () => {
  it('should render correctly with default props', () => {
    const component = renderer.create(
      <FunnelHeader />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with forced H1 title', () => {
    const component = renderer.create(
      <FunnelHeader title="Foo" titleAsH1 homeLinkUrl="http://test" homeLinkTitle="Bar" />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with forced span title', () => {
    const component = renderer.create(
      <FunnelHeader title="Foo" titleAsH1={false} />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
