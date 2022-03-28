public class Account {
    private double balance;
	private String name;
	
	public Account(){
		balance=0;
		name="";
	}
	
	public Account(double b, String n){
		balance=b;
		name=n;
	}
	
	public void deposit(double amount){
		balance=balance+amount;
	}
	
	public void withdraw(double amount){
		balance=balance-amount;
	}
	
	public String toString(){
		return "Name: "+name+", Balance: "+balance;
	}
	
	public double getBalance(){
		return balance;
	}
}
