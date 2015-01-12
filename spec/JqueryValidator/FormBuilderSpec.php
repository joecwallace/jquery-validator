<?php namespace spec\JqueryValidator;

use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

use Illuminate\Html\HtmlBuilder;
use Illuminate\Routing\UrlGenerator;

class FormBuilderSpec extends ObjectBehavior
{
	function let(HtmlBuilder $html, UrlGenerator $url)
	{
		$this->beConstructedWith($html, $url, 'csrf');
	}

	function it_is_initializable()
	{
		$this->shouldHaveType('JqueryValidator\FormBuilder');
	}

	function it_should_add_validation_rules_to_inputs_when_specified(HtmlBuilder $html)
	{
		$name = 'test';
		$rules = 'required|email';
		$attributes = $this->getExpectedAttributes($name, $rules);

		$html->attributes($attributes)->shouldBeCalled()->willReturn(' attrs');

		$this->validate([$name => $rules])->input('text', $name)->shouldBe('<input attrs>');
	}

	function it_should_not_add_validations_rules_when_unspecified(HtmlBuilder $html)
	{
		$name = 'test';
		$attributes = $this->getExpectedAttributes($name);

		$html->attributes($attributes)->shouldBeCalled()->willReturn(' attrs');

		$this->input('text', $name)->shouldBe('<input attrs>');
	}

	function getExpectedAttributes($name, $rules = null)
	{
		$attributes = [
			'id' => null,
			'name' => 'test',
			'type' => 'text',
			'value' => null,
		];

		if ($rules) $attributes['data-validations'] = $rules;

		return $attributes;
	}
}
