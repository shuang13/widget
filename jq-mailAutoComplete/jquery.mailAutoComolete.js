var log = console.log.bind(console);

(function($) {
var MailSelector = function(element, options) {
    this.$input = element;
    this.$ul = $('<ul></ul>');
    this.indexOfLi = 0;
    this.defaults = {
        emailType: [
            '',
            '@qq.com',
            '@163.com',
            '@126.com',
            '@gmail.com',
            '@sina.com',
            '@sohu.com',
            '@outlook.com',
            '@139.com'
        ],
        width: 250,
        height: 200,
        index: 99,
        classname: 'selector-box',

    };
    this.options = $.extend({}, this.defaults, options)
}
MailSelector.prototype.draw = function(text) {
    this.$ul.addClass(this.options.classname);
    this.$ul.css({
        'width': this.options.width + 'px',
        'height': this.options.height + 'px',
        'z-index': this.options.index + 'px',
    });
    this.$input.parent().append(this.$ul);
    if (text.length > 0 && text.indexOf('@') == -1) {
        this.$ul.empty().show();
        var typeLength = this.options.emailType.length;
        var emailType = this.options.emailType;
        for (i in emailType) {
            var $li = $('<li>' + this.$input.val() + emailType[i] + '</li>');
            this.$ul.append($li);
        }
    } else {
        this.$ul.empty().hide();
    }
}
MailSelector.prototype.setActive = function(index) {
    this.$ul.find('li').eq(index).addClass('active')
        .siblings().removeClass();
}
MailSelector.prototype.select = function(key) {
    var typeLength = this.options.emailType.length;
    var text = this.$input.val();
    var selectMail = this.$ul.find('li').eq(this.indexOfLi).text();

    //up
    if (key == 38) {
        event.preventDefault();

        if (this.indexOfLi <= 0) {
            this.indexOfLi = typeLength - 1;
        } else {
            this.indexOfLi--;
        }
    }
    //down
    else if (key == 40) {
        if (this.indexOfLi >= typeLength - 1) {
            this.indexOfLi = 0;
        } else {
            this.indexOfLi++;
        }
    }
    //enter
    else if (key == 13) {
        this.$input.val(selectMail);
        this.$ul.hide();
    }
    //输入
    else {
        this.draw(text);
    }
    this.setActive(this.indexOfLi);

}
$.fn.mailAutoComplete = function(options) {
    var $input = this;
    var mailSelector = new MailSelector($input, options);
    // event
    mailSelector.$input.on('keyup', function(event) {
        event.preventDefault();
        var key = event.keyCode;
        mailSelector.select(key);
    });
    mailSelector.$input.on('keydown', function(event) {
        var key = event.keyCode;
        // 消除input键盘输入时光标向左移动默认事件
        if (key == 38) {
            event.preventDefault();
        }
    });
    mailSelector.$ul.on('click', 'li', function(event) {
        mailSelector.$input.empty().val(event.target.innerHTML);
    });
    mailSelector.$ul.on('mouseenter', 'li', function(event) {
        var $this = $(this);
        mailSelector.setActive($this.index())
    });
    $(document).on('mouseup', function(event) {
        mailSelector.$ul.hide();
    });
}
})(jQuery);