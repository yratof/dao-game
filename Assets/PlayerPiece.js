#pragma strict
var selector:Transform;
var predictor:Transform;
var team:int;
var game: Game;
var board_pos:Vector2;
var target_pos:Vector2;
var can_move:boolean = false;
function Select(e) {
	if ( ! game.can_move( team ) ) {
		return;
	}
	selector.localPosition = transform.localPosition;
}

var map:Vector2[] = new Vector2[8];

function Start () {
	var i = 0;
	map[i++] = Vector2( -1,  0 );
	map[i++] = Vector2( -1, -1 );
	map[i++] = Vector2(  0, -1 );
	map[i++] = Vector2(  1, -1 );
	map[i++] = Vector2(  1,  0 );
	map[i++] = Vector2(  1,  1 );
	map[i++] = Vector2(  0,  1 );
	map[i++] = Vector2( -1,  1 );
}
function angle_to_dir( angle :int ) {
	angle += 180;
	var i = angle/45;
	if ( 8 <= i ) {
		i = 0;
	}
	return map[i];
}

function Predict(e:UnityEngine.EventSystems.BaseEventData) {
	if ( ! game.can_move( team ) ) {
		return;
	}

	var pointer : UnityEngine.EventSystems.PointerEventData = e as UnityEngine.EventSystems.PointerEventData;
	var temp_pos = Vector2();
	temp_pos.x = pointer.position.x - transform.position.x;
	temp_pos.y = pointer.position.y - transform.position.y;
	temp_pos.Normalize();
	var temp_angle = Mathf.Atan2(temp_pos.y, temp_pos.x) * Mathf.Rad2Deg;
	temp_angle = Mathf.Round( temp_angle / 45 ) * 45;
	var temp_target = angle_to_dir( temp_angle );
	var legal = 0;
	for ( var i = 1; i < 4; i++ ) {
		if ( game.is_legal_move( i * temp_target + board_pos ) ) {
			legal = i;
		}
		else {
			break;
		}
	}
	if ( 0 < legal ) {
		can_move = true;
		target_pos = legal * temp_target + board_pos;
		predictor.localPosition = game.v23( target_pos );
	}
	else {
		can_move = false;
		predictor.localPosition = game.v23( 9999, 9999 );
	}
}

function Move( e:UnityEngine.EventSystems.BaseEventData ) {
	if ( ! game.can_move( team ) ) {
		return;
	}
//	Debug.Log( can_move );
//	Debug.Log( target_pos );
	predictor.localPosition = game.v23( 9999, 9999 );
	if ( can_move ) {
		transform.localPosition = game.v23( target_pos );
		game.board[ board_pos.y ][ board_pos.x ] = 0;
		board_pos = target_pos;
		game.board[ board_pos.y ][ board_pos.x ] = team;
		selector.localPosition = game.v23( 9999, 9999 );
		game.team_turn = ( game.team_turn + 2 ) % 2 + 1;
		Debug.Log( game.team_turn );
	}
}