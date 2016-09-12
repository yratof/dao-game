#pragma strict
var selector:Transform;
var predictor:Transform;
var team:int;
var game: Game;
function Select(e) {
	if ( game.canMove( team ) ) {
		selector.localPosition = transform.localPosition;
	}
}
function Predict(e:UnityEngine.EventSystems.BaseEventData) {
	var pointer : UnityEngine.EventSystems.PointerEventData = e as UnityEngine.EventSystems.PointerEventData;
	var temp_pos = Vector2();

	// Debug.Log( pointer.position );
	predictor.position = pointer.position;

	temp_pos.x = pointer.position.x - transform.position.x;
	temp_pos.y = pointer.position.y - transform.position.y;
	temp_pos.Normalize();
	Debug.Log( '---' );
	Debug.Log( temp_pos );

}


