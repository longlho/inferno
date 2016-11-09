import { expect } from 'chai';
import { render } from './../rendering';
import * as Inferno from '../../testUtils/inferno';
Inferno; // suppress ts 'never used' error

describe('createTree - SVG (JSX)', () => {

	let container;

	beforeEach(() => {
		container = document.createElement('div');
	});

	afterEach(() => {
		render(null, container);
	});

	it('should remove namespaced SVG attributes', () => {
		render(<svg>
			<image xlink:href="http://i.imgur.com/w7GCRPb.png" />
		</svg>, container);

		expect(container.firstChild.tagName).to.eql('svg');
		expect(container.firstChild.firstChild.hasAttributeNS(
		'http://www.w3.org/1999/xlink',
		'href'
		)).to.equal(true);

		render(<svg>
			<image />
		</svg>, container);

		expect(container.firstChild.tagName).to.eql('svg');
		expect(container.firstChild.firstChild.hasAttributeNS(
		'http://www.w3.org/1999/xlink',
		'href'
		)).to.equal(false);
	});

	it('should update namespaced SVG attributes', () => {
		render(<svg>
			<image xlink:href="http://i.imgur.com/w7GCRPb.png" />
		</svg>, container);

		expect(container.firstChild.tagName).to.eql('svg');
		expect(container.firstChild.firstChild.hasAttributeNS(
		'http://www.w3.org/1999/xlink',
		'href'
		)).to.equal(true);

		render(<svg>
			<image xlink:href="http://i.imgur.com/JvqCM2p.png" />
		</svg>, container);

		expect(container.firstChild.tagName).to.eql('svg');
		expect(container.firstChild.firstChild.getAttributeNS(
		'http://www.w3.org/1999/xlink',
		'href'
		)).to.equal('http://i.imgur.com/JvqCM2p.png');
	});

	it('should add / change / remove xlink:href attribute', () => {
		render(<svg>
			<use xlink:href="#test"/>
		</svg>, container);

		expect(container.firstChild.firstChild.getAttributeNS(
		'http://www.w3.org/1999/xlink',
		'href'
		)).to.equal('#test');

		render(<svg>
			<use xlink:href="#changed"/>
		</svg>, container);

		expect(container.firstChild.firstChild.getAttributeNS(
		'http://www.w3.org/1999/xlink',
		'href'
		)).to.equal('#changed');

		render(<svg>
			<use/>
		</svg>, container);

		expect(container.firstChild.firstChild.hasAttributeNS(
		'http://www.w3.org/1999/xlink',
		'href'
		)).to.equal(false);
	});
});
