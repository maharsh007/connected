Game.Menu = function (game) { };

Game.Menu.prototype = {
	create: function() {
	    this.tap1_s = game.add.audio('tap1');
	    this.combo_s = game.add.audio('combo');

		game.add.text(w/2, 50, "connected", { font: "30px Arial", fill: "#2c3e50"})
			.anchor.setTo(0.5, 0.5);

		var label_start = game.add.text(w/2, h-50, "connect the two dots to start", { font: "20px Arial", fill: "#2c3e50"});
		label_start.anchor.setTo(0.5, 0.5);

		this.dot1 = this.game.add.sprite(w/2-25, h/2, 'dot');
		this.dot1.anchor.setTo(0.5, 0.5);
		this.dot1.frame = 0;
		this.dot1.inputEnabled = true;
		this.dot1.input.useHandCursor = true;
		this.dot2 = this.game.add.sprite(w/2+25, h/2, 'dot');
		this.dot2.anchor.setTo(0.5, 0.5);
		this.dot2.frame = 0;
		this.dot2.inputEnabled = true;
		this.dot2.input.useHandCursor = true;

		this.sound_toggle = this.game.add.button(w-70, 40, 'sound', this.toggle_sound, this);

		game.add.tween(label_start).to({ angle:1 }, 300).to({ angle:-1 }, 300).loop().start();
	},

	update: function() {
		var bool1 = Phaser.Rectangle.contains(this.dot1.body, game.input.activePointer.x, game.input.activePointer.y);
		var bool2 = Phaser.Rectangle.contains(this.dot2.body, game.input.activePointer.x, game.input.activePointer.y);

		if (game.input.activePointer.isDown) {

			if (this.dot1.frame == 0 && bool1) {
				this.dot1.frame += 1;
				if (sound) this.tap1_s.play('', 0, 0.5, false);
			}
			if (this.dot2.frame == 0 && bool2) {
				this.dot2.frame += 1;
				if (sound) this.tap1_s.play('', 0, 0.5, false);
			}
		}

		if (game.input.activePointer.isUp) {
			if (this.dot1.frame == 0 || this.dot2.frame == 0) {
				this.dot1.frame = 0;
				this.dot2.frame = 0;
			}
			else {
				if (sound) this.combo_s.play('', 0, 0.5, false);
				this.game.state.start('Play');
			}
		}
	},

	toggle_sound: function() {
		if (this.sound_toggle.frame == 0) {
			this.sound_toggle.frame = 1;
			sound = false;
		}
		else {
			this.sound_toggle.frame = 0;
			sound = true;			
		}
	},

	shutdown: function() {
		game.world.removeAll();	
	}
};
