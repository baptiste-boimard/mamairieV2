import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import Footer from '../../src/components/Footer';

describe('<Footer />', () => {
  test('should have three subtitle', () => {
    const wrapper = shallow(<Footer />);
    const titles = wrapper.find('h2');
    expect(titles).toHaveLength(3);
  });

  describe('Footer', () => {
    test('Should render without crash', async () => {
      render(<Footer />);
    });
  });

  // test('should display the prop text inside a paragraph', () => {
  //   const wrapper = shallow(<Content title="test" text="Hello world" recipes={[]} />);
  //   const paragraph = wrapper.find('p.content-text');
  //   expect(paragraph.text()).toBe('Hello world');
  // });

  // test('should have a list if we give recipes', () => {
  //   const wrapper = shallow(<Content title="test" text="Hello world" recipes={data} />);
  //   const list = wrapper.find('.content-list');
  //   expect(list).toHaveLength(1);
  // });

  // test('should not have a list if we give no recipes', () => {
  //   const wrapper = shallow(<Content title="test" text="Hello world" recipes={[]} />);
  //   const list = wrapper.find('.content-list');
  //   expect(list).toHaveLength(0);
  // });

// test('should have as many Card as recipes', () => {
//   const wrapper = shallow(<Content title="test" text="Hello world" recipes={data} />);
//   const cards = wrapper.find(Card);
//   expect(cards).toHaveLength(data.length);
// });
});
